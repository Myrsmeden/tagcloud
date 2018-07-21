package models

import (
	"github.com/olivere/elastic"
)

//Tweet a model struct that represents a typical
//tweet in elastic.
type Tweet struct {
	UserID    int                   `json:"user_id"`
	TweetID   int                   `json:"tweet_id"`
	Text      string                `json:"text"`
	Hashtags  []string              `json:"hashtags"`
	Mentions  []string              `json:"mentions"`
	Language  string                `json:"lang"`
	Date      string                `json:"date"`
	Suggest   *elastic.SuggestField `json:"suggest_field,omitempty"`
	Following string                `json:"following"`
}
