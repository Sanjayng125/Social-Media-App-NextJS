import Posts from "@/components/posts/Posts";
import Story from "@/components/story/Story";

export default function Home() {
  return (
    <div className="w-full bg-purple-300 h-full md:p-2 md:rounded overflow-y-auto max-md:mb-12 dark:bg-white dark:bg-opacity-10">
      {/* <h1 className="text-2xl font-semibold text-white mb-3 mx-2">Stories</h1> */}
      <div className="mb-2">
        <Story />
      </div>
      <hr />
      <h1 className="text-2xl font-semibold text-white mb-3 mx-2">Grams</h1>
      <div>
        <Posts />
      </div>
    </div>
  );
}
