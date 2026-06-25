import { useRef, useEffect, useState } from 'react';
import { ArrowButton } from 'src/ui/arrow-button';
import { Button } from 'src/ui/button';
import clsx from 'clsx';
import { Select } from 'src/ui/select';
import { RadioGroup } from 'src/ui/radio-group';
import { Separator } from 'src/ui/separator';

import styles from './ArticleParamsForm.module.scss';
import {
	ArticleStateType,
	OptionType,
	backgroundColors,
	contentWidthArr,
	defaultArticleState,
	fontColors,
	fontFamilyOptions,
	fontSizeOptions,
} from 'src/constants/articleProps';

type ArticleParamsFormProps = {
	onApply: (state: ArticleStateType) => void;
};

export const ArticleParamsForm = ({ onApply }: ArticleParamsFormProps) => {
	const [isOpened, setIsOpened] = useState<boolean>(false);
	const [formState, setFormState] =
		useState<ArticleStateType>(defaultArticleState);
	const asideRef = useRef<HTMLElement>(null);
	const arrowRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		const handleClickOutside = (event: MouseEvent) => {
			if (!asideRef.current || !arrowRef.current) return;

			const target = event.target as Node;

			const isOutsideSidebar = !asideRef.current.contains(target);
			const isOutsideArrow = !arrowRef.current.contains(target);

			if (isOutsideSidebar && isOutsideArrow && isOpened) {
				setIsOpened(false);
			}
		};
		if (isOpened) {
			document.addEventListener('mousedown', handleClickOutside);
		}
		return () => {
			document.removeEventListener('mousedown', handleClickOutside);
		};
	}, [isOpened]);

	const handleChange =
		(field: keyof ArticleStateType) => (value: OptionType) => {
			setFormState((prev) => ({ ...prev, [field]: value }));
		};
	const handleReselt = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		setFormState(defaultArticleState);
	};

	const handleSubmit = (e: React.FocusEvent<HTMLFormElement>) => {
		e.preventDefault();
		onApply(formState);
		setIsOpened(false);
	};

	return (
		<>
			<div ref={arrowRef}>
				<ArrowButton
					isOpen={isOpened}
					onClick={() => {
						setIsOpened(!isOpened);
					}}
				/>
			</div>

			<aside
				ref={asideRef}
				className={clsx(styles.container, {
					[styles.container_open]: isOpened,
				})}>
				<form
					className={styles.form}
					onSubmit={handleSubmit}
					onReset={handleReselt}>
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
