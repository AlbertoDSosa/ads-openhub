import style from './style.module.css'

export default function Spinner() {
  return (
    <div className={style.continer}>
      <div className={style.spinner}></div>
    </div>
  )
}
