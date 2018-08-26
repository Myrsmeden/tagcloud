package app

import (
	"log"
	"net/http"
	"os"
	"searchservice/app/web"
)

//StartServer starts the entire web server.
//Connects the router with the routes and
//starts the file hosting of the frontend
func StartServer(port string) {
	router := web.NewRouter(routes)
	frontendDir := http.Dir(os.Getenv("PTCFRONTEND"))
	router.ServeFiles("/*filepath", http.Dir(os.Getenv("PTCFRONTEND")))
	log.Println("Starting the webserver...", "http://localhost"+port)
	log.Println("Serving front end:", frontendDir)
	log.Fatal(http.ListenAndServe(port, router))
}
