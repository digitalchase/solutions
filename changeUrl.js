//В параметр передать то, что будет после (например https://github.com/...)
//То что будет передано запишется вместо троеточия

function updateURL(newUrl) {
      if (history.pushState) {
          history.pushState(null, null, newUrl);
      }
}
