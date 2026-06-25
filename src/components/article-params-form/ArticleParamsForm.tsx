import { useRef, useEffect } from 'react';
import { ArrowButton } from 'src/ui/arrow-button';
import { Button } from 'src/ui/button';
import clsx from 'clsx';

import styles from './ArticleParamsForm.module.scss';
import {
	ArticleStateType,
	OptionType,
	backgroundColors,
	contentWidthArr,
	fontColors,
	fontFamilyOptions,
	fontSizeOptions,
} from 'src/constants/articleProps';
import { Select } from 'src/ui/select';
import { RadioGroup } from 'src/ui/radio-group';
import { Separator } from 'src/ui/separator';

type ArticleParamsFormProps = {
	isOpened: boolean;
	onToggle: () => void;
	formState: ArticleStateType;
	handlers: {
		onChange: (field: keyof ArticleStateType, value: OptionType) => void;
		onApply: () => void;
		onReset: () => void;
	};
};

export const ArticleParamsForm = ({
	isOpened,
	onToggle,
	formState,
	handlers,
}: ArticleParamsFormProps) => {
	const asideRef = useRef<HTMLElement>(null);

	useEffect(() => {
		const handleClickOutside = (event: MouseEvent) => {
			if (
				asideRef.current &&
				!asideRef.current.contains(event.target as Node)
			) {
				const target = event.target as HTMLElement;
				const isArrowButton = target.closest('[class*="ArrowButton"]');
				if (!isArrowButton && isOpened) {
					onToggle();
				}
			}
		};
		if (isOpened) {
			document.addEventListener('mousedown', handleClickOutside);
		}
		return () => {
			document.removeEventListener('mousedown', handleClickOutside);
		};
	}, [isOpened, onToggle]);

	const handleChange =
		(field: keyof ArticleStateType) => (value: OptionType) => {
			handlers.onChange(field, value);
		};
	return (
		<>
			<ArrowButton isOpen={isOpened} onClick={onToggle} />

			<aside
				ref={asideRef}
				className={clsx(styles.container, {
					[styles.container_open]: isOpened,
				})}>
				<form
					className={styles.form}
					onSubmit={(e) => {
						e.preventDefault();
						handlers.onApply();
					}}
					onReset={(e) => {
						e.preventDefault();
						handlers.onReset();
					}}>
					<h2 className={styles.title}>ЗАДАЙТЕ ПАРАМЕТРЫ</h2>

					<Select
						title='Шрифт'
						options={fontFamilyOptions}
						selected={formState.fontFamilyOption}
						onChange={handleChange('fontFamilyOption')}
					/>
					<RadioGroup
						title='Размер шрифта'
						name='fontSize'
						options={fontSizeOptions}
						selected={formState.fontSizeOption}
						onChange={handleChange('fontSizeOption')}
					/>
					<Select
						title='Цвет шрифта'
						options={fontColors}
						selected={formState.fontColor}
						onChange={handleChange('fontColor')}
					/>
					<Separator />

					<Select
						title='Цвет фона'
						options={backgroundColors}
						selected={formState.backgroundColor}
						onChange={handleChange('backgroundColor')}
					/>

					<Select
						title='Ширина контента'
						options={contentWidthArr}
						selected={formState.contentWidth}
						onChange={handleChange('contentWidth')}
					/>
					<div className={styles.bottomContainer}>
						<Button title='Сбросить' htmlType='reset' type='clear' />
						<Button title='Применить' htmlType='submit' type='apply' />
					</div>
				</form>
			</aside>
		</>
	);
};
