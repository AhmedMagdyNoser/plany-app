import { useEffect } from "react";
import { appName } from "@/utils/constants";

function useDocumentTitle(title: string, defaultTitle: string = appName): void {
  useEffect(() => {
    document.title = title;
    return () => {
      document.title = defaultTitle;
    };
  }, [title, defaultTitle]);
}

export default useDocumentTitle;
