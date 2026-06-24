import { ArrowButton } from 'src/ui/arrow-button';
import { Button } from 'src/ui/button';

import styles from './ArticleParamsForm.module.scss';
import {
	ArticleStateType,
	backgroundColors,
	contentWidthArr,
	fontColors,
	fontFamilyOptions,
	fontSizeOptions,
} from 'src/constants/articleProps';
import { Select } from 'src/ui/select';
import { RadioGroup } from 'src/ui/radio-group';

type ArticleParamsFormProps = {
	isOpened: boolean;
	onToggle: () => void;
	formState: ArticleStateType;
	onFormChange: (field: keyof ArticleStateType, value: any) => void;
	onApply: () => void;
	onReset: () => void;
};

//  Передаем пропсы в компонент
export const ArticleParamsForm = ({
	isOpened,
	onToggle,
	formState,
	onFormChange,
	onApply,
	onReset,
}: ArticleParamsFormProps) => {
	const handleChange = (field: keyof ArticleStateType) => (value: any) => {
		onFormChange(field, value);
	};
	return (
		<>
			<ArrowButton isOpen={isOpened} onClick={onToggle} />

			{isOpened && (
				<aside
					className={`${styles.container} ${
						isOpened ? styles.container_open : ''
					}`}>
					<form
						className={styles.form}
						onSubmit={(e) => {
							e.preventDefault();
							onApply();
						}}
						onReset={(e) => {
							e.preventDefault();
							onReset();
						}}>
						<Select
							title='Шрифт'
							options={fontFamilyOptions}
							selected={formState.fontFamilyOption}
							onChange={handleChange('fontFamilyOption')}
						/>
						<RadioGroup
							title='Размер'
							name='fontSize'
							options={fontSizeOptions}
							selected={formState.fontSizeOption}
							onChange={handleChange('fontSizeOption')}
						/>
						<Select
							title='Цвет текста'
							options={fontColors}
							selected={formState.fontColor}
							onChange={handleChange('fontColor')}
						/>
						<Select
							title='Ширина контента'
							options={contentWidthArr}
							selected={formState.contentWidth}
							onChange={handleChange('contentWidth')}
						/>
						<Select
							title='Цвет фона'
							options={backgroundColors}
							selected={formState.backgroundColor}
							onChange={handleChange('backgroundColor')}
						/>
						<div className={styles.bottomContainer}>
							<Button title='Сбросить' htmlType='reset' type='clear' />
							<Button title='Применить' htmlType='submit' type='apply' />
						</div>
					</form>
				</aside>
			)}
		</>
	);
};
