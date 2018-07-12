package main

import (
	"encoding/json"
	"fmt"
	"io/ioutil"
	"os"
	"os/exec"
	"strconv"
)

type partiesObject struct {
	Parties []PartyType
}

// PartyType for a party (name and list of users)
type PartyType struct {
	Name  string
	Users []int
}

func main() {
	accountsFile, e := ioutil.ReadFile("../config/accounts.json")
	if e != nil {
		fmt.Printf("Accounts file error: %v\n", e)
		os.Exit(1)
	}

	// Parse all parties in json file into our partiesObject
	var parties partiesObject
	json.Unmarshal(accountsFile, &parties)

	// Loop through each party and fetch followers for each user
	for i := 0; i < len(parties.Parties); i++ {
		for j := 0; j < len(parties.Parties[i].Users); j++ {
			user := parties.Parties[i].Users[j]
			_ = os.Mkdir("../config/followers", 0775)
			fmt.Printf("%d\n", user)
			cmd := "echo " + strconv.Itoa(user) + " | python3 followerFetcher.py > ../config/followers/" + strconv.Itoa(user) + " 2>>../config/followers/stderr.txt"

			out, err := exec.Command("bash", "-c", cmd).Output()
			if err != nil {
				fmt.Printf("Failed to execute command: %s \n%s\n", cmd, err)
			}
			fmt.Printf("Output: %s", string(out))
		}
	}
}
