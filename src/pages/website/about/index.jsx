import { Icon } from "@iconify/react";
import { NavLink } from "react-router-dom";
import AboutImage from "../../../assets/images/all-img/about-img.jpg";

const About = () => {
  return (
    <>
      <section className="container mt-12 mb-24">
        <div className="md:mb-6 mb-4 flex space-x-3 rtl:space-x-reverse">
          <ul className="breadcrumbs">
            <li className="text-main">
              <NavLink to="/" className="text-lg">
                <Icon icon="heroicons-outline:home" />
              </NavLink>
              <span className="breadcrumbs-icon rtl:transform rtl:rotate-180">
                <Icon icon="heroicons:chevron-right" />
              </span>
            </li>
            <li className="capitalize text-slate-500 dark:text-slate-400">
              About us
            </li>
          </ul>
        </div>
        <div className="flex justify-center">
          <div className="w-full lg:w-[80%] text-center mt-10">
            <h1 className="text-main text-4xl mb-3">About Us</h1>
            <p className="text-gray-500 text-xs md:text-md">
              Lorem ipsum dolor sit amet, qui assum oblique praesent te. Quo ei
              erant essent scaevola, est ut clita dolorem, ei est mazim fuisset
              scribentur. Mel ut decore salutandi intellegam.
            </p>
          </div>
        </div>
        <div className="grid lg:grid-cols-2 grid-cols-1 my-8 gap-8">
          <img
            src={AboutImage}
            alt=""
            className="w-full h-full rounded-lg object-cover"
          />

          <div className="flex flex-col gap-4">
            <h4 className="text-2xl text-main">
              Success usually comes to those who are busy to be looking for it
            </h4>
            <p className="text-gray-400 text-xs">
              Lorem ipsum dolor sit amet, qui assum oblique praesent te. Quo ei
              erant essent scaevola, est ut clita dolorem, ei est mazim fuisset
              scribentur. Mel ut decore salutandi intellegam. Labitur epicurei
              vis cu, in mei rationibus consequuntur. Duo eu modus periculis,
              inermis detracto expetendis ius eu. Mel ludus viderer noluisse cu,
              te virtute constituam vix, et eos justo mucius salutatus. Nam
              illum dicant laudem no.
              <br />
              <br />
              Per ne quot sale, in mei brute novum putant. Delectus reprimique
              cu cum, pri et decore vocent dolorem, usu in legere tibique
              denique. In impedit feugait accusata mei, ne ius feugait
              vituperata neglegentur, an vel nostrum appareat percipit. Nullam
              legendos quaestio ius ad, vis et quodsi prompta adipiscing. Eos et
              brute incorrupte, audire placerat mel ex.
              <br />
              <br />
              Laudem cetero principes at eam. Ne sit latine appetere erroribus,
              choro altera oporteat ut vel, eum omnium utroque nominavi et.
              Malis necessitatibus mea ex, putant disputando at vix.
              <br />
            </p>
            <button className="btn btn-primary w-max">Contact Us</button>
          </div>
        </div>
      </section>
      <section className="w-full bg-main  my-4 ">
        <div className="container lg:grid-cols-4 grid grid-cols-2 py-8 place-items-center">
          <div className="flex flex-col justify-center my-6">
            <h6 className="text-white text-lg md:text-4xl font-bold text-center">1000+</h6>
            <p className="text-gray-50 text-center">Monthly Visits</p>
          </div>
          <div className="flex flex-col justify-center my-6">
            <h6 className="text-white text-lg md:text-4xl font-bold text-center">
              10000+
            </h6>
            <p className="text-gray-50 text-center">Happy Custumers</p>
          </div>
          <div className="flex flex-col justify-center my-6">
            <h6 className="text-white text-lg md:text-4xl font-bold text-center">1200+</h6>
            <p className="text-gray-50 text-center">Daily Visits</p>
          </div>
          <div className="flex flex-col my-6">
            <h6 className="text-white text-lg md:text-4xl font-bold text-center">5032+</h6>
            <p className="text-gray-50 text-center">Products Listed</p>
          </div>
        </div>
      </section>
      <section className="container my-12">
        <h4 className="text-main text-4xl font-semibold">
          Our Company Stories
        </h4>
        <div className="flex flex-col gap-8 mt-8">
          <p className="md:text-md text-xs">
            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Odio rerum
            labore, modi ducimus delectus cum asperiores officiis consectetur
            reiciendis neque vero mollitia. Ut itaque magni, labore quam ab,
            iste ipsum obcaecati molestiae sunt consequuntur laboriosam dolores,
            dolorum velit aperiam architecto similique autem quae iusto ducimus
            dolorem. Repellat aperiam unde voluptatum?
          </p>
          <p className="md:text-md text-xs">
            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Quas natus
            quia aut ducimus dolorum quisquam commodi minus magni cupiditate
            exercitationem explicabo ipsa delectus expedita placeat, dignissimos
            quibusdam eum ipsam in! Nam eum et quae fuga exercitationem,
            consequatur, repellat, sint accusamus ex illo necessitatibus. Eos
            expedita quidem odio doloremque eveniet quod accusamus quasi
            incidunt voluptatum qui veniam dicta placeat magnam, saepe quam ad
            vitae error asperiores voluptas? Sunt, nobis et! Sit recusandae
            tempore dignissimos blanditiis sed similique nam voluptatum adipisci
            saepe.
          </p>
          <p className="md:text-md text-xs">
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Odit hic,
            doloribus perferendis quis eos et enim inventore eius optio nam
            molestiae ut totam exercitationem id doloremque blanditiis iste
            veniam mollitia.
          </p>
          <p className="md:text-md text-xs">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Asperiores
            sint, impedit tenetur cupiditate corporis nisi ipsa minima! Soluta
            facilis quasi qui quas sed inventore, placeat deleniti veniam odio
            itaque, hic quidem officiis similique minus accusantium. Ab dolorum
            officiis, necessitatibus in quaerat, voluptas neque quae unde ipsam
            natus architecto praesentium. A amet mollitia, numquam sit hic
            soluta tempora. Placeat minus pariatur omnis praesentium, asperiores
            cupiditate ducimus excepturi temporibus suscipit possimus fuga quod
            recusandae officia reprehenderit quisquam voluptates ad quis nam
            similique, ut vel. Nemo sed animi optio architecto magnam ipsum quod
            qui saepe. Iusto adipisci veniam harum saepe illum. Ex alias beatae
            excepturi iure accusantium, itaque voluptatem incidunt deserunt
            natus, reprehenderit deleniti rem, quidem voluptatibus obcaecati
            dicta quaerat sunt doloribus facilis?
          </p>
        </div>
      </section>
    </>
  );
};

export default About;
