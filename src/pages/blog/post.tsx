import { Button } from "@/components/ui/button";
import { PlusIcon } from "lucide-react";

export function Post() {
  return (
    <section className="space-y-4">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Blog posts</h1>
        <Button variant="default" asChild>
          <a href="/blog/posts/create">
            <PlusIcon />
            New Posts
          </a>
        </Button>
      </div>
    </section>
  )
}
