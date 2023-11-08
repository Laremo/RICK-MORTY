import styles from './location-container.module.css';

export default function PageController({
  current,
  pageControl,
  managePageNav,
  setCurrentPage,
}) {
  const pageNav = (mode) => {
    if (mode === 'next' && pageControl.next) {
      managePageNav(pageControl.next);
      setCurrentPage(current + 1);
    }
    if (mode === 'prev' && pageControl.prev) {
      managePageNav(pageControl.prev);
      setCurrentPage(current - 1);
    }
  };
  return (
    <div className={styles.pageNav}>
      <h4
        className={pageControl.prev ? '' : styles.inactive}
        onClick={() => {
          pageNav('prev');
        }}>
        {'<'}
      </h4>
      <p>{current}</p>
      <h4
        className={pageControl.next ? '' : styles.inactive}
        onClick={() => {
          pageNav('next');
        }}>
        {'>'}
      </h4>
    </div>
  );
}
