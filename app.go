package main

import (
	"net/http"
	"google.golang.org/appengine"
)

func main() {
	http.HandleFunc("/", func (w http.ResponseWriter, r *http.Request) {
		if r.URL.Path != "/" {
			http.Redirect(w, r, "/", http.StatusFound)
			return
		}
	})

	appengine.Main()
}
