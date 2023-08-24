import homepage from '../assets/jpg/homepage.jpg'

function Home() {
    return (
      <div className="profile">
      <header className='pageHeader'>
        <p>
          Home
        </p>
      </header>
      <img src={homepage} alt="homepage" className="homeImg"/>
      <main>
        <p>
          <b>
            Welcome!
          </b>
        </p>
        <p>
        I am Anya and I am the creator and founder of FamiFood.
        During the start of the COVID-19 pandemic, my mother and I began spending lots of time together isolated in our house.
        In an attempt to develop new skills and make use of the time we had together, we began to cook new and exciting recipes 
        that we found online as well as the classic meals stored in her recipe box. Shortly after, our family began a practice 
        of swapping recipes on a weekly basis so we never ran out of new ideas. 
        Sharing our favorite home-cooked meals with each other quickly became a way we could all bond and communicate during a time 
        when we couldn’t physically be together to enjoy these recipes as a family unit.
        <br />
        <br />
         Further down the line, I was chatting with my brother, Eric, when he showed me an Excel file where he stored the links to all his favorite online
          recipes. While this was a productive way to navigate to his favorite sites, I identified two issues with this idea. First of all, half the fun of 
          determining what you want to eat for dinner is by viewing the colorful pictures of the food that accompanies the recipe. While you could view these once 
          you reach the website, you couldn't toggle through them on the Excel file.
          Secondly, some of the best recipes are those that are created and passed down by your family. Most of which don’t have a fancy site or link to navigate to when you’re deciding what you want to eat for dinner that night. 
        </p>
        <p>
        The only solution to these menacing issues was simple. I had to create a website where my family members could view and upload their favorite recipes so that they were always accessible, could never get lost, and could include both online and family-made recipes. That is how the FamiFood website was created. FamiFood is a site made with the purpose of centralizing the new and historical recipes enjoyed by my family. Once you are ready to explore these delicious recipes, please navigate to the Explore page.
        </p>
      </main>
      </div>
    )
  }
  
  export default Home