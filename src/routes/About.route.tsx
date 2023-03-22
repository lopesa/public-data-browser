import styles from "styles/About.module.scss";

export default function About() {
  return (
    <div className={styles.MainContainer}>
      <h3>About</h3>
      <p className={styles.Bold}>
        • The primary driver for this project is that I&rsquo;m an Engineer who
        needed a side project.
      </p>
      <p className={styles.Bold}>
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
      </a>
    </div>
  );
}
