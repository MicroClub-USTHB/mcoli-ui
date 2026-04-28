import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '../ui/mc-accordion';

export function AccordionDemo() {
  return (
    <Accordion defaultValue={['product']} className="max-w-lg">
      <AccordionItem value="product">
        <AccordionTrigger>Product Information</AccordionTrigger>
        <AccordionContent>
          <p>
            Our flagship product combines cutting-edge technology with sleek design. Built with
            premium materials, it offers unparalleled performance and reliability.
          </p>
          <p>
            Key features include advanced processing capabilities, and an intuitive user interface
            designed for both beginners and experts.
          </p>
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="shipping">
        <AccordionTrigger>Shipping Details</AccordionTrigger>
        <AccordionContent>
          <p>We offer standard (5-7 days), express (2-3 days), and overnight shipping.</p>
          <p>
            Free shipping on international orders is available once the minimum order amount is
            reached.
          </p>
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="returns">
        <AccordionTrigger>Return Policy</AccordionTrigger>
        <AccordionContent>
          <p>
            Returns accepted within 30 days. Items must be unused and in original packaging. Refunds
            processed within 5-7 business days.
          </p>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
}

export default AccordionDemo;
