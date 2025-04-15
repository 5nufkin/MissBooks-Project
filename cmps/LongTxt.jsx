const { useState } = React

export function LongTxt({ txt, length = 100 }) {
  const [isExpanded, setIsExpanded] = useState(false)

  if (txt.length <= length) return (<p>{txt}</p>)

  const visibleText =
    isExpanded
      ? txt
      : txt.substring(0, length) + '...'

  function onToggleTextExpantion() {
    setIsExpanded(prevIsExpanded => !prevIsExpanded)
  }

  return (
    <section className="long-text">
      <p className="visible-text">{visibleText}</p>

      <button
        onClick={onToggleTextExpantion}
        className="btn-toggle-expand" >
        {isExpanded ? 'Read less' : 'Read more'}
      </button>

    </section>
  )
}