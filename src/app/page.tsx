import Posts from "@/components/post/Posts";
import Story from "@/components/story/Story";

export default function Home() {
  return (
    <div className="w-full bg-white border shadow-2xl h-full md:rounded overflow-y-auto max-md:mb-16 dark:bg-white dark:bg-opacity-10 dark:border-none">
      <div className="mb-2 md:p-2">
        <Story />
      </div>
      <hr />
      <h1 className="text-2xl font-semibold text-black dark:text-white mb-3 mx-2">
        Grams
      </h1>
      <div>
        <Posts />
      </div>
    </div>
  );
}
