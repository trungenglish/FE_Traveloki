import LeftNavBar from "./LeftNavBar";
import RightContent from "./RightContent";
function DatChoCuaToi() {
  return (
    <div className=" flex w-full justify-center h-[700px]">
      <div className="flex w-[1222px] justify-between">
        <LeftNavBar />
        <RightContent />
      </div>
    </div>
  );
}

export default DatChoCuaToi;
