Deployed site: https://herobuilder.vercel.app/
The Hero Builder:
1. Users can create a profile through forms managed with Zod and React Hook Form.
2. Following this, you can select items and personalise your hero with a name and backstory.
3. By creating a hero, you save them to your account*. The info is stored on MongoDB and you can log back in whenever and view your heroes. 
4. The database is managed with tRPC and Prisma.
5. The site uses components from https://ui.shadcn.com/


*Accounts can be made with any random jumble of letters so long as they follow the 'random@jumble.com' email format (although I'd recommend using something easy to remember - I've been using james@email.com). Passwords are encrypted with bcrypt.

There is room for expansion (and polish) in the web app, some things maybe don't make perfect sense. For example, the gold required to buy items and what the point of having leftover gold is. Previously you could adjust the stats with your remanining gold but this renderd item selection somewhat pointless if you could just shift things around anyway. One of my ideas is that it could decrementally be used to determine the hero's health.

As mentioned, there is room for improvement and growth with this project and it is a work in progress. 
