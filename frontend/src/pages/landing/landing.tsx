import landingSVG from "../../assets/landing.svg";
export default function landing() {
  return (
    <article className="pros lg:prose-xl">
      <h1 className="font-gilroy-bold">
        Slick Chats
        <br />
        Big laughs
      </h1>
      <p className="">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam</p>
      <img src={landingSVG} alt="landing" />
    </article>
  );
}
