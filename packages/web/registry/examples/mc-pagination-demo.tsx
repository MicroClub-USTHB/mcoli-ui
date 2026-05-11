import { useState } from 'react';
import { McPagination } from '../ui/mc-pagination';

export default function McButtonDemo() {
  const [{ page, totalPages }, setPagination] = useState({
    page: 1,
    totalPages: 7,
  });
  return (
    <McPagination
      nextButtonLabel="Next"
      previousButtonLabel="Previous"
      page={page}
      totalPages={totalPages}
      onPageChange={(page) => setPagination((values) => ({ ...values, page }))}
    />
  );
}
