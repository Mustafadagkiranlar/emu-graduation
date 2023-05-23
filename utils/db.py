import pymongo
from decouple import config


class Database:
    def __init__(self):
        try:
            client = pymongo.MongoClient(config("MONGO_URI"))
        # return a friendly error if a URI error is thrown
        except pymongo.errors.ConfigurationError:
            print(
                "An Invalid URI host error was received. Is your Atlas host name correct in your connection string?"
            )
        self.db = client.plates
        self.db_authority = self.db["authority"]
        self.db_school = self.db["school"]
        self.db_camplate = self.db["camplate"]

    def find_authority(self, plate, data):
        # FIND DOCUMENTS for authority
        #
        # Now that we have data in Atlas, we can read it. To retrieve all of
        # the data in a collection, we call find() with an empty filter.

        # result = my_collection.find()

        # if result:
        #     for doc in result:
        #         my_recipe = doc["name"]
        #         my_ingredient_count = len(doc["ingredients"])
        #         my_prep_time = doc["prep_time"]
        #         print(
        #             "%s has %x ingredients and takes %x minutes to make."
        #             % (my_recipe, my_ingredient_count, my_prep_time)
        #         )

        # else:
        #     print("No documents found.")

        # print("\n")

        # We can also find a single document. Let's find a document
        # if plate is found we need to send as a wanted notification
        my_doc = self.db_authority.find_one({"plate": f"{plate}"})

        if my_doc is not None:
            # plate wanted update time date, location and isWanted of plate
            data["isWanted"] = True
            self.update_camplate(plate, data)
            return True
        else:
            # plate not wanted update time date and location of plate
            return False

    def update_camplate(self, plate, data):
        # UPDATE A DOCUMENT for authority
        #
        # You can update a single document or multiple documents in a single call.
        #
        # Here we update the prep_time value on the document we just found.
        #
        # Note the 'new=True' option: if omitted, find_one_and_update returns the
        # original document instead of the updated one.

        my_doc = self.db_camplate.find_one_and_update(
            {"plate": f"{plate}"}, {"$set": data}, new=True
        )
        if my_doc is not None:
            # print("Updated plate:")
            # print(my_doc)
            pass
        else:
            self.insert(data)

    def insert(self, data):
        # INSERT DOCUMENTS
        #
        # You can insert individual documents using collection.insert_one().
        # In this example, we're going to create four documents and then
        # insert them all with insert_many().

        try:
            result = self.db_camplate.insert_one(data)

            # return a friendly error if the operation fails
        except pymongo.errors.OperationFailure:
            print(
                "An authentication error was received. Are you sure your database user is authorized to perform write operations?"
            )

    def find_school(self, plate, data):
        # FIND DOCUMENTS for authority
        #
        # Now that we have data in Atlas, we can read it. To retrieve all of
        # the data in a collection, we call find() with an empty filter.

        # result = my_collection.find()

        # if result:
        #     for doc in result:
        #         my_recipe = doc["name"]
        #         my_ingredient_count = len(doc["ingredients"])
        #         my_prep_time = doc["prep_time"]
        #         print(
        #             "%s has %x ingredients and takes %x minutes to make."
        #             % (my_recipe, my_ingredient_count, my_prep_time)
        #         )

        # else:
        #     print("No documents found.")

        # print("\n")

        # We can also find a single document. Let's find a document
        # that has the string "potato" in the ingredients list.
        my_doc = self.db_school.find_one({"plate": f"{plate}"})

        if my_doc is not None:
            self.update_camplate(plate, data)
            return True
        else:
            return False