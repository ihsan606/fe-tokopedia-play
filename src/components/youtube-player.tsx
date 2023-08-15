type PlayerProps = {
  videoUrl: string;
  title: string;
  className?: string;
};

const YoutubeShortPlayer = ({ title,  videoUrl, className }: PlayerProps) => {
  return (
    <div className={` ${className} lg:px-4 xl:px-4 px-0 pt-2`}>
      <iframe
        className=" rounded-lg lg:h-[620px] xl:h-[620px] md:h-screen h-screen w-full"
        src={videoUrl}
        title={title}
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; "
      ></iframe>

     
    </div>
  );
};

export default YoutubeShortPlayer;
