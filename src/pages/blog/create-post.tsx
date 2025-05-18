import { InsertBlogForm } from "@/components/forms/insert-blog-form";
import { Button } from "@/components/ui/button";
import { List } from "lucide-react";

export function CreatePost() {
  return (
    <section className="space-y-4">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Create blog posts</h1>
        <Button variant="default" asChild>
          <a href="/blog/posts">
            <List />
            Blog Posts
          </a>
        </Button>
      </div>
      <InsertBlogForm />
    </section>
  )
}
