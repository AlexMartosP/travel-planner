# Travel planner
Do you have a trip coming up? Nice, you can easily use this tool to plan your activities through out the entire trip and invite your fellow travelers.

[Live URL](https://travel-planner-amp.vercel.app)

This is an open source travel planner where you can:

✈️ Create trips

🍴 Create activities for each trip

🧑‍🤝‍🧑 Invite fellow travelers

🛫 Countdown the days until the trip  

## Roadmap ideas
[Go to roadmap](https://github.com/users/AlexMartosP/projects/8/views/1)

## Tech stack
- NextJS (App router)
- Tailwind
- Radix UI
- Supabase
- React email
- Postmark

## Development

### Prerequisite
- [Docker](https://docs.docker.com/desktop/)

### Setup

1. Run `npm run dev`

> [!NOTE]
> This will create the local database and seed it

2. Login with your google account
> [!NOTE]
> Your account will not have any seeded trips, you can easily add records to the `trips_profiles` table with your profile id and trip id (found in `trips` table)

## Contribution
You are more than welcome to contribute to this project. The app is not bug-free so feel free to squash them or implement new features, my ideas can be found [here](https://github.com/users/AlexMartosP/projects/8/views/1) or you may have even better ideas 🙂

### Code conventions
When creating this project, my ambission was to do as much in the server or database as possible. For instanse, no Supabase requests in the client, only server side. Due to RSC this is quite easy and would be best to keep it like that. Also I used server actions for the most part and even if I had my doubts on the concept I think it is a nice concept (not `useFormStatus` though 😆).


