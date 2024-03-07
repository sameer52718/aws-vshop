import { Accordion, AccordionTab } from "primereact/accordion";
const Faq = () => {
  return (
    <div className="container my-12 ">
      <div className="flex justify-center">
      <Accordion activeIndex={0} className="space-y-8 w-full lg:w-2/3 " >
        <AccordionTab headerClassName="md:text-lg text-sm"
          header="What is View n Shop and how does it work?"
        >
          <p className="m-0 md:text-lg text-xs">
          View n Shop is a unique video ecommerce platform where customers can watch videos of products and directly make purchases within the video interface. Our platform showcases a range of products through engaging video content, allowing customers to view products in action and gain a better understanding of their features and benefits. Simply watch a video, click on the product you are interested in, and follow the prompts to make a purchase seamlessly.
          </p>
        </AccordionTab>
        <AccordionTab headerClassName="md:text-lg text-sm" 
          header="What types of products are available on View n Shop?"
        >
          <p className="m-0 md:text-lg text-xs">
          At View n Shop, we offer a wide variety of products ranging from electronics and fashion to home goods and beauty products. Our video catalog is constantly updated with the latest items and trends, ensuring you have access to a diverse selection of products. Each product is showcased in a detailed video, giving you a comprehensive view before making a purchase.
          </p>
        </AccordionTab>
        <AccordionTab headerClassName="md:text-lg text-sm" 
          header="How can I trust the quality of products sold on View n Shop?"
        >
          <p className="m-0 md:text-lg text-xs">
          We are committed to providing high-quality products to our customers. All items featured in our videos are sourced from reputable manufacturers and brands. Additionally, we provide detailed product descriptions, customer reviews, and ratings to help you make an informed decision. Our customer service team is always available to address any concerns or questions about product quality.
          </p>
        </AccordionTab>
        <AccordionTab headerClassName="md:text-lg text-sm"
          header="What is the return policy for products bought on View n Shop?"
        >
          <p className="m-0 md:text-lg text-xs">
          We offer a hassle-free return policy. If you are not satisfied with your purchase, you can return most items within 30 days for a full refund or exchange. The product must be returned in its original condition and packaging. Some items may be subject to different return policies, which will be clearly mentioned on the product page.
          </p>
        </AccordionTab>
        <AccordionTab headerClassName="md:text-lg text-sm"
          header="How can I track my order and receive customer support?"
        >
          <p className="m-0 md:text-lg text-xs">
          Once you place an order, you will receive an email confirmation with a tracking number. You can use this number on our website to track your order's status. For any assistance or inquiries, our customer support team is available 24/7. You can reach us through email, phone, or live chat on our website for prompt and efficient service.
          </p>
        </AccordionTab>
      </Accordion>
      </div>
    </div>
  );
};

export default Faq;