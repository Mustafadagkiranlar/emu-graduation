"""same detection code as detector.py
but seperated from other stuff"""

import cv2
import imutils
import easyocr
import schedule
import cloudinary
import numpy as np
import utils.db as db

from datetime import datetime

from cloudinary.uploader import upload
from cloudinary.utils import cloudinary_url


class LicensePlateDetector:
    def __init__(self):
        self.reader = easyocr.Reader(["en"])

    def detect(self, frame):
        # Resize the image to a fixed size for consistent processing
        img = cv2.resize(frame, (600, 600))

        # Convert the image to grayscale and apply a bilateral filter for noise reduction
        gray = cv2.cvtColor(img, cv2.COLOR_BGR2GRAY)
        bfilter = cv2.bilateralFilter(gray, 11, 17, 17)

        # Perform edge detection using the Canny algorithm
        edged = cv2.Canny(bfilter, 30, 200)

        # Find the contours in the image and select the 10 largest contours by area
        contours = cv2.findContours(
            edged.copy(), cv2.RETR_TREE, cv2.CHAIN_APPROX_SIMPLE
        )
        contours = imutils.grab_contours(contours)
        contours = sorted(contours, key=cv2.contourArea, reverse=True)[:10]

        # Find the contour with 4 points (assumed to be the license plate)
        location = None
        for contour in contours:
            approx = cv2.approxPolyDP(contour, 10, True)
            if len(approx) == 4:
                location = approx
                break

        if location is not None:
            # Create a mask to isolate the license plate region
            mask = np.zeros(gray.shape, np.uint8)
            new_image = cv2.drawContours(mask, [location], 0, 255, -1)
            new_image = cv2.bitwise_and(img, img, mask=mask)

            # Crop the license plate region from the image
            (x, y) = np.where(mask == 255)
            (x1, y1) = (np.min(x), np.min(y))
            (x2, y2) = (np.max(x), np.max(y))
            cropped_image = gray[x1 : x2 + 1, y1 : y2 + 1]

            # Use OCR to read the characters on the license plate
            result = self.reader.readtext(cropped_image)

            if len(result) > 0:
                plate = result[0][-2].upper()
                return plate
        else:
            return None


def reset_plates():
    global past_plates
    past_plates.clear()


if __name__ == "__main__":
    schedule.every(5).minutes.do(reset_plates)
    database = db.Database()
    detector = LicensePlateDetector()
    cap = cv2.VideoCapture("sources/plate1.mp4")

    cloudinary.config(
        cloud_name="dbul788xz",
        api_key="782759882722568",
        api_secret="IfxvGcloCdZS4xHwui35NSVaauY",
        secure=True,
    )

    past_plates = []

    while cap.isOpened():
        schedule.run_pending()
        ret, frame = cap.read()
        if not ret:
            break

        plate = detector.detect(frame)

        if plate is not None and plate not in past_plates:
            past_plates.append(plate)
            print(f"Detected license plate: {plate}")
            # start checking plate
            now = datetime.now().strftime("%d %m %Y %H:%M")
            image_name = f"vehicles/{plate}-{now}.jpg"
            cv2.imwrite(image_name, frame)
            response = upload(image_name)
            data = {
                "plate": f"{plate}",
                "enterance": f"{now}",
                "photo": response["secure_url"],
                "location": "Compute Engineering Department",
                "isWanted": False,
            }
            isWanted = database.find_authority(plate, data)
            if isWanted:
                # TODO send signal to gate controller to not open the gate
                print("Wanted by authority don't open the gate")
                pass
            else:
                # check school database to confirm plate
                isRegistered = database.find_school(plate, data)
                if isRegistered:
                    # TODO send signal to gate controller to open the gate
                    print("Registered plate open the gate")
                    pass
                else:
                    # TODO send signal to gate controller to not open the gate
                    print("Not registered plate don't open the gate")
                    pass

    cap.release()
    cv2.destroyAllWindows()
