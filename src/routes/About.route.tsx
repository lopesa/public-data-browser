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
      {/* <p>
        It's interesting how much data there is publically available and I
        wanted a single place to browse though it, without the mental overhead
        of switching presentations often. In a way though, this app represents
        the core of many apps.
      </p> */}
      <p>
        Core functionality for the app for now should be to take in any JSON
        dataset and present it in a consistent, readable way, especially to
        quickly preview data sets that may be included. It should be built in a
        modular way so those core functions can expand easily. (Import other
        than JSON, do more with the datasets, etc.)
      </p>
      <p>
        Funny sidenote, on March 30, 2023 data.gov did a big redesign, making
        their interface to browse this data much better as well as (afaik)
        taking away the raw json data offering, which underlies much of this at
        mvp. While this project aims to ingest any data, honestly the main data
        source was to be, at least at first, data.gov data. I am thinking to
        take it as a complement to my design sense that I saw that their
        browsing mechanism was easily improvable :) , otherwise I'm just kind of
        bummed I can't exactly release this at a more public url as more of an
        actual thing, like I was going to. I'm lucky my original idea was to not
        even ingest their json data into my db, and just work with files, so I
        had the json files of a couple of the departments saved from before
        their redesign. Anyway, the primary reason for this project stands
        accomplished which was for me to build it. I am however releasing it now
        as an unpolished prototype. At the very least the data.gov data will
        become stale, so please actually use this at your own risk. Or don't. No
        guarantees what will become of it.
      </p>
      <p>the code for it is here:</p>
      {/* <p className={styles.Bold}>
        • This is piecing together a lot of awesome open source tools and
        libraries, and that's mostly all it is. The code for this available
        here: [tbd]. Please feel free to use it or make suggestions there on
        github.
      </p>
      <p>
        I got laid off recently and in the job market I found my skill set to be
        pretty domain specific coming out of my recent long term position. So I
        wanted to build a full stack project using the latest, best Javascript
        frameworks and libraries, or, since that could be debated somewhat, this
        aimed to use some <i>particular</i> frameworks and libraries.
        Specifically, this uses Redux, and I think it&rsquo;s a good use case
        for it, but also because I wanted to work with Redux. This doesn&rsquo;t
        use Next.js which I really like and would also be a strong candidate for
        a framework for this project.
      </p>
      <p>
        This particular side project arose because I&rsquo;m also interested in
        Data. Who isn&rsquo;t? (and wow, especially lately!). In my spare spare
        time on some side side project I'd love to pick up some data analysis
        skills. I've started down the path of Kaggle and found quickly that I
        needed data to analyze. I know Kaggle has data, but also I'm also
        interested in this latest push of Climate Tech and I know some of the
        data being put to use is government generated so I found the main source
        of data so far for this site: data.gov.
      </p>
      <p>
        The aim of this tool is to accomodate bringing in any data I can find to
        this central place. The bookmark feature can be used to save items from
        different sources and ultimately I think this could function as a repo
        for data sets to bring into other tools.
      </p>
      <p>Interesting stuff I've found:</p>
      <a href="https://rath.kanaries.net/" target="_blank" rel="noreferrer">
        https://rath.kanaries.net/
      </a> */}
    </div>
  );
}
