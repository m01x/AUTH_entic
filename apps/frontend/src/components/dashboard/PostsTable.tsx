import { Pencil, Trash2 } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { formatDate } from "@/lib/mockData";
import type { MockPost } from "@/lib/mockData";
import { errorToast, successToast } from "@/hooks/useToast";

interface PostsTableProps {
  posts: MockPost[];
}

export function PostsTable({ posts }: PostsTableProps) {
  const handleEdit = (post: MockPost) => {
    successToast(`Editando: ${post.title}`);
  };

  const handleDelete = (post: MockPost) => {
    errorToast(`Eliminado: ${post.title}`);
  };

  return (
    <div className="glass-card w-full rounded-2xl p-6">
      <h2 className="text-lg font-semibold text-white">Últimos Posts</h2>
      <div className="mt-4">
        <Table>
          <TableHeader>
            <TableRow className="border-white/10 hover:bg-transparent">
              <TableHead className="text-white/60">Título</TableHead>
              <TableHead className="text-white/60">Autor</TableHead>
              <TableHead className="text-white/60">Fecha</TableHead>
              <TableHead className="text-right text-white/60">
                Acciones
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {posts.map((post) => (
              <TableRow key={post.id} className="border-white/5">
                <TableCell className="font-medium text-white">
                  {post.title}
                </TableCell>
                <TableCell className="text-white/70">
                  {post.author}
                </TableCell>
                <TableCell className="text-white/70">
                  {formatDate(post.createdAt)}
                </TableCell>
                <TableCell className="text-right">
                  <div className="flex justify-end gap-1">
                    <Button
                      variant="ghost"
                      size="icon-xs"
                      onClick={() => handleEdit(post)}
                      className="text-white/50 hover:text-white hover:bg-white/10"
                    >
                      <Pencil className="size-3.5" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon-xs"
                      onClick={() => handleDelete(post)}
                      className="text-red-400/50 hover:text-red-400 hover:bg-red-500/10"
                    >
                      <Trash2 className="size-3.5" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
