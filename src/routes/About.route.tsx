import styles from "styles/About.module.scss";

export default function About() {
  return (
    <div className={styles.MainContainer}>
      <h3>About</h3>
      <p>
        The primary driver for this project is that I&rsquo;m an Engineer who
        needed a side project. So I took this opportunity to build a full stack
        app from greenfield, taking care to choose tech pieces I wanted to work
        with/master. So it includes:
        <ul>
          <li>Docker (compose)</li>
          <li>Express</li>
          <li>Prisma</li>
          <li>MySql</li>
          <li>React</li>
          <li>Redux</li>
          <li>redux-toolkit, rtk query</li>
          <li>radix-ui</li>
        </ul>
      </p>
      <p>
        Core functionality for the app for now should be to take in any JSON
        dataset and present it in a consistent, readable way, especially to
        quickly preview data sets that may be included. It should be built in a
        modular way so those core functions can expand easily. (Import other
        than JSON, do more with the datasets, etc.)
      </p>
      <p>
        Funny sidenote, on March 30, 2023 data.gov did a big redesign, making
        their interface to browse their data much better, as well as (as far as
        I can tell, without too much digging) taking away the raw json data
        offering, which underlies much of this app at mvp. While this project
        aims to ingest any data, the main data source was to be, at first,
        data.gov data. I am thinking to take it as a complement to my design
        sense that I saw that their browsing mechanism was easily improvable :)
        , otherwise I'm just kind of bummed I can't exactly release this at a
        more public url as more of an actual thing, like I was going to. I'm
        lucky my original idea was to not even ingest their json data into my
        db, and just work with files, so I still had the json files of a couple
        of the departments saved from before their redesign. Anyway, the primary
        reason for this project stands accomplished which was for me to build
        it. I am releasing it now though, as a more unpolished prototype. At the
        very least the data.gov data will become stale, so please actually use
        this at your own risk. No guarantees what will become of it.
      </p>
      <p>the code for it is here: [tbd]</p>
    </div>
  );
}
