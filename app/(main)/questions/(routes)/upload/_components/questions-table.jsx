import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const QuestionsTable = ({ data }) => {
  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="flex items-center gap-4 truncate">
              Question
            </TableHead>
            <TableHead>Topic</TableHead>
            <TableHead className="hidden md:table-cell">Caselet</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {!data ? (
            <TableRow className="h-24 text-center">
              <TableCell colSpan={5}>No Data Available</TableCell>
            </TableRow>
          ) : (
            data.map(
              (v, i) =>
                v.length >= 9 && (
                  <TableRow key={i}>
                    <TableCell className="flex items-center gap-4">
                      <div
                        className="question-cell flex flex-col gap-2 whitespace-pre-wrap"
                        dangerouslySetInnerHTML={{ __html: v[0] }}
                      />
                    </TableCell>
                    <TableCell className="hidden md:table-cell text-nowrap">
                      {v[7]}
                    </TableCell>
                    <TableCell className="hidden md:table-cell">
                      {v[9] ? "Yes" : "No"}
                    </TableCell>
                  </TableRow>
                )
            )
          )}
        </TableBody>
      </Table>
    </div>
  );
};

export default QuestionsTable;
