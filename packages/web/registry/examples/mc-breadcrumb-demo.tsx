import {
  McBreadcrumb,
  McBreadcrumbEllipsis,
  McBreadcrumbItem,
  McBreadcrumbLink,
  McBreadcrumbList,
  McBreadcrumbPage,
  McBreadcrumbSeparator,
} from '../ui/mc-breadcrumb';

export default function McBreadcrumbDemo() {
  return (
    <div className="flex flex-col gap-6">
      <McBreadcrumb>
        <McBreadcrumbList>
          <McBreadcrumbItem>
            <McBreadcrumbLink href="#home">Home</McBreadcrumbLink>
          </McBreadcrumbItem>
          <McBreadcrumbSeparator />
          <McBreadcrumbItem>
            <McBreadcrumbLink href="#components">Components</McBreadcrumbLink>
          </McBreadcrumbItem>
          <McBreadcrumbSeparator />
          <McBreadcrumbItem>
            <McBreadcrumbPage>Breadcrumb</McBreadcrumbPage>
          </McBreadcrumbItem>
        </McBreadcrumbList>
      </McBreadcrumb>

      <McBreadcrumb>
        <McBreadcrumbList>
          <McBreadcrumbItem>
            <McBreadcrumbLink href="#home">Home</McBreadcrumbLink>
          </McBreadcrumbItem>
          <McBreadcrumbSeparator />
          <McBreadcrumbItem>
            <McBreadcrumbEllipsis />
          </McBreadcrumbItem>
          <McBreadcrumbSeparator />
          <McBreadcrumbItem>
            <McBreadcrumbLink href="#components">Components</McBreadcrumbLink>
          </McBreadcrumbItem>
          <McBreadcrumbSeparator />
          <McBreadcrumbItem>
            <McBreadcrumbPage>Breadcrumb</McBreadcrumbPage>
          </McBreadcrumbItem>
        </McBreadcrumbList>
      </McBreadcrumb>
    </div>
  );
}
