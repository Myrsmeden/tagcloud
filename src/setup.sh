mkdir config
touch config/access.conf

echo '{
    "parties": [
        {
            "name": "Moderaterna",
            "users": [
                19226961
            ]
        },
        {
            "name": "Socialdemokraterna",
            "users": [
                3801501
            ]
        },
        {
            "name": "Vänsterpartiet",
            "users": [
                17233550
            ]
        },
        {
            "name": "Miljöpartiet",
            "users": [
                18124359
            ]
        },
        {
            "name": "Sverigedemokraterna",
            "users": [
                97878686
            ]
        },
        {
            "name": "Liberalerna",
            "users": [
                18687011
            ]
        },
        {
            "name": "Kristdemokraterna",
            "users": [
                19014898
            ]
        },
        {
            "name": "Centerpartiet",
            "users": [
                3796501
            ]
        }
    ]
}' > config/accounts.json
