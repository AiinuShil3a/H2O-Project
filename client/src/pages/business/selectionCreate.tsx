const LeftSide = () => {
  return (
    <div className="w-[90vh] h-screen flex flex-col items-center justify-center relative">
      <a
        href="https://www.youtube.com/"
        className="relative group w-full text-center shadow-xl"
      >
        <div className="text-overlay text-[100px] font-bold">
          Create Homestay
        </div>
        <div className="bg-custom-bg1 absolute inset-0"></div>
      </a>
      <a
        href="https://www.youtube.com/"
        className="relative group mt-[5rem] w-full text-center shadow-xl"
      >
        <div className="text-overlay text-[100px] font-bold">
          Create Package
        </div>
        <div className="bg-custom-bg2 absolute inset-0"></div>
      </a>
    </div>
  );
};

const SelectionCreate = () => {
  return (
    <div className="flex h-[93vh] overflow-hidden relative z-1">
      <div className="absolute inset-0 w-full h-full bg-gif" />
        <LeftSide />
    </div>
  );
};


export default SelectionCreate;
