import { useState } from 'react'
import styles from './app.module.css'
import getDateFormat from './utils/Date'

export default function App() {
	const [value, setValue] = useState('')
	const [list, setList] = useState(JSON.parse(localStorage.getItem('listArr')) || [])
	const [error, setError] = useState('')

	const onInputButtonClick = () => {
		const promptValue = prompt('Введите значение')
		if (promptValue && promptValue.length < 3) {
			setError('Введенное значение должно содержать минимум 3 символа')
		} else {
			setValue(promptValue)
			setError('')
		}
	}

	const onAddButtonClick = () => {
		const updatedList = [
			...list,
			{ id: Date.now(), value: value, addDate: getDateFormat(new Date(), '.') },
		]
		setList(updatedList)
		setValue('')
		setError('')
		localStorage.setItem('listArr', JSON.stringify(updatedList))
	}

	const deleteListItem = (elId) => {
		const updatedList = list.filter((el) => el.id !== elId)
		setList(updatedList)
		localStorage.setItem('listArr', JSON.stringify(updatedList))
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
					disabled={!value.length}
				>
					Добавить в список
				</button>
			</div>
			<div className={styles['list-container']}>
				<h2 className={styles['list-heading']}>Список:</h2>
				<p
					className={styles['no-margin-text']}
					hidden={list.length === 0}
				>
					Нет добавленных элементов
				</p>
				<ul className={styles.list} hidden={list.length === 0}>
					{list.map((el) => (
						<li id={el.id} key={el.id} className={styles['list-item']}>
							{el.value} <span>{el.addDate}</span>
							<button onClick={() => deleteListItem(el.id)}>удалить</button>
						</li>
					))}
				</ul>
			</div>
		</div>
	)
}
