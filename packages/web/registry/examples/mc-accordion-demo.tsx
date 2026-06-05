import {
  McAccordion,
  McAccordionContent,
  McAccordionItem,
  McAccordionTrigger,
} from '../ui/mc-accordion';

export function AccordionDemo() {
  return (
    <McAccordion defaultValue={['product']} className="max-w-lg">
      <McAccordionItem value="product">
        <McAccordionTrigger>Product Information</McAccordionTrigger>
        <McAccordionContent>
          <p>
            Our flagship product combines cutting-edge technology with sleek design. Built with
            premium materials, it offers unparalleled performance and reliability.
          </p>
          <p>
            Key features include advanced processing capabilities, and an intuitive user interface
            designed for both beginners and experts.
          </p>
        </McAccordionContent>
      </McAccordionItem>
      <McAccordionItem value="shipping">
        <McAccordionTrigger>Shipping Details</McAccordionTrigger>
        <McAccordionContent>
          <p>We offer standard (5-7 days), express (2-3 days), and overnight shipping.</p>
          <p>
            Free shipping on international orders is available once the minimum order amount is
            reached.
          </p>
        </McAccordionContent>
      </McAccordionItem>
      <McAccordionItem value="returns">
        <McAccordionTrigger>Return Policy</McAccordionTrigger>
        <McAccordionContent>
          <p>
            Returns accepted within 30 days. Items must be unused and in original packaging. Refunds
            processed within 5-7 business days.
          </p>
        </McAccordionContent>
      </McAccordionItem>
    </McAccordion>
  );
}

export default AccordionDemo;
