import Navbar from "./components/Navbar";
import ParkingLotList from "./components/ParkingLotList";

export default function Home() {
  return (
    <div className="min-h-screen bg-base-200">
      <Navbar />
      <div class="container mx-auto mt-10">
        <div className="flex flex-row">
         <ParkingLotList />
          <div className="flex-1">
            <h3 class="text-4xl font-bold text-center my-7">Interactive map</h3>
            <img src="/campus-map.png" alt="map" className="rounded-box shadow-lg"/>
          </div>
        </div>
      </div>
    </div>
  );
}
