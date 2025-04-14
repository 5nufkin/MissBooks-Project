const { useState } = React

export function LongTxt({ txt, length = 100 }) {
  const [isExpanded, setIsExpanded] = useState(false)

  if (txt.split(' ').length <= length) return (<p>{txt}</p>)


  const visibleWords =
    isExpanded
      ? txt
      : txt.split(' ').slice(0, length).join(' ') + '...'

  function toggleTextExpantion() {
    setIsExpanded(prevIsExpanded => !prevIsExpanded)
  }

  return (
    <section className="long-text">
      <p className="visible-text">{visibleWords}</p>
      <button onClick={toggleTextExpantion} className="btn-toggle-expand" >{isExpanded ? 'Read less' : 'Read more'}</button>
    </section>
  )
}