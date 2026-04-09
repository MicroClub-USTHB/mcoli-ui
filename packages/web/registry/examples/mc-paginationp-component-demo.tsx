import {
  McPagination,
  McPaginationContent,
  McPaginationEllipsis,
  McPaginationItem,
  McPaginationLink,
  McPaginationNext,
  McPaginationPrevious,
} from '@/registry/ui/mc-pagination';

function McPaginationComponentDemo() {
  <McPagination>
    <McPaginationContent>
      <McPaginationItem>
        <McPaginationPrevious href="#" />
      </McPaginationItem>
      <McPaginationItem>
        <McPaginationLink href="#">1</McPaginationLink>
      </McPaginationItem>
      <McPaginationItem>
        <McPaginationLink href="#" isActive>
          2
        </McPaginationLink>
      </McPaginationItem>
      <McPaginationItem>
        <McPaginationLink href="#">3</McPaginationLink>
      </McPaginationItem>
      <McPaginationItem>
        <McPaginationEllipsis />
      </McPaginationItem>
      <McPaginationItem>
        <McPaginationNext href="#" />
      </McPaginationItem>
    </McPaginationContent>
  </McPagination>;
}
