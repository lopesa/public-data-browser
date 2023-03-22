import { useAppSelector } from "app/hooks";
import { selectToken } from "app/User.slice";
import { selectBookmarks } from "features/bookmarksSlice";
import React from "react";
import { useEffect } from "react";
import {
  useAddBookmarksMutation,
  useLazyGetBookmarksQuery,
  useRemoveBookmarkMutation,
} from "services/apiSlice";

type BookmarksProps = {
  children: React.ReactNode;
};

/**
 *
 * thinking to try to use this as a meta component and then acces it via
 * context from children:
 * https://react.dev/reference/react/createContext
 */
const Bookmarks = ({ children }: BookmarksProps) => {
  const localBookmarks = useAppSelector(selectBookmarks);
  const [getRemoteBookmarks, { data: remoteBookmarks, isLoading, error }] =
    useLazyGetBookmarksQuery();
  const token = useAppSelector(selectToken);
  let bookmarks = token ? remoteBookmarks : localBookmarks;

  const [
    addBookmarks,
    { isLoading: addBookmarksIsLoading, error: addBookmarksError },
  ] = useAddBookmarksMutation();

  const [
    removeBookmark,
    { isLoading: removeBookmarkIsLoading, error: removeBookmarkError },
  ] = useRemoveBookmarkMutation();

  useEffect(() => {
    if (token) {
      getRemoteBookmarks();
    }
  }, [token, getRemoteBookmarks]);

  return (
    <>
      {/* { children } */}
      {React.Children.map(children, (child) => {
        return React.cloneElement(child as React.ReactElement, {
          data: bookmarks,
        });
      })}
    </>
  );
};

export default Bookmarks;
