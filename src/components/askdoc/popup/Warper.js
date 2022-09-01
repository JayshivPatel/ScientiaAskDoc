const Warper = (Comp) => () =>
  (
    <div className="example-warper">
      <Comp />
    </div>
  )

export default Warper
