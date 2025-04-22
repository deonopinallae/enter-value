import { useState } from 'react'
import styles from './app.module.css'
import getDateFormat from './utils/Date'


export default function App() {
	const [value, setValue] = useState('')
	const [list, setList] = useState(JSON.parse(localStorage.getItem('listArr')))
	const [error, setError] = useState('')

	const onInputButtonClick = () => {
		const promptValue = prompt('Введите значение')
		if (promptValue) {
			if (promptValue.length < 3) {
				setError('Введенное значение должно содержать минимум 3 символа')
			} else {
				setValue(promptValue)
				setError('')
			}
		}
	}

	const onAddButtonClick = () => {
		setList([...list, { id: Date.now(), value: value, addDate: getDateFormat(new Date(), '.') }])
		setValue('')
		setError('')
	}

	localStorage.setItem('listArr', JSON.stringify([...list]))

	const deleteListItem = (event) => {
		list.splice(list.findIndex(el => String(el.id) === event.target.closest('li').id), 1)
		setList([...list])
		localStorage.setItem('listArr', JSON.stringify([...list]))
	}

	
	return (
		<div className={styles.app}>
			<h1 className={styles['page-heading']}>Ввод значения</h1>
			<p className={styles['no-margin-text']}>
				Текущее значение <code>value</code>: "
				<output className={styles['current-value']}>{value}</output>"
			</p>
			{error !== '' ? <div className={styles.error}>{error}</div> : null}
			<div className={styles['buttons-container']}>
				<button className={styles.button} onClick={onInputButtonClick}>
					Ввести новое
				</button>
				<button
					onClick={onAddButtonClick}
					className={styles.button}
					disabled={value.length < 3 ? true : false}
				>
					Добавить в список
				</button>
			</div>
			<div className={styles['list-container']}>
				<h2 className={styles['list-heading']}>Список:</h2>
				<p className={styles['no-margin-text']} hidden={list.length === 0?false:true}>Нет добавленных элементов</p>
				<ul className={styles.list} hidden={list.length === 0?true:false}>
					{list.map(el => <li id={el.id} key={el.id} className={styles['list-item']}>{el.value} <span>{el.addDate}</span> <button onClick={deleteListItem}>удалить</button></li>)}
				</ul>
			</div>
		</div>
	)
}
