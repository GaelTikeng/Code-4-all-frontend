import CodeCard from "@/components/molecules/codeCard";
import CommentCart from "@/components/molecules/commentCart";
import HeroSection from "@/components/molecules/heroSection";
import Navbar from "@/components/molecules/navbar";
import CarousselComment from "@/components/organisms/carouselComments";
import CommentCarousel from "@/components/organisms/commentCarousel";
import Footer from "@/components/organisms/footer";
import Discount from "@/components/organisms/newzletter";

export default function Home() {

  return (
    <div>
      <Navbar />
      <HeroSection />
      <div className="flex gap-0">
        <CodeCard
          title="code source "
          author="Gael tikeng"
          rating={5}
          price={5000}
        />
        <CodeCard
          title="code source "
          author="Gael tikeng"
          rating={5}
          price={5000}
        />
      </div>
      <div className="grid grid-cols-2">
        <CommentCart
          image="/image3.jpg"
          createdAt="12 jan 2032"
          name="gaelinho"
          comment="hello guys"
        />
        <CommentCart
          image="/image3.jpg"
          createdAt="12 jan 2032"
          name="gaelinho"
          comment="hello guys"
        />
      </div>
      <Discount/>
      {/* <CarousselComment /> */}
      <CommentCarousel />
      <Footer/>

    </div>
  )
}