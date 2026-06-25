import { CSSProperties, useState } from 'react';
import clsx from 'clsx';

import { Article } from '../article/Article';
import { ArticleParamsForm } from '../article-params-form/ArticleParamsForm';
import {
	ArticleStateType,
	defaultArticleState,
	OptionType,
} from './../../constants/articleProps';

import styles from './app.module.scss';

export const App = () => {
	const [isOpened, setIsOpened] = useState<boolean>(false);

	const [formState, setFormState] =
		useState<ArticleStateType>(defaultArticleState);

	const [articleState, setArticleState] =
		useState<ArticleStateType>(defaultArticleState);

	const handleApply = () => {
		setArticleState(formState);
	};

	const handleReset = () => {
		setFormState(defaultArticleState);
		setArticleState(defaultArticleState);
	};

	const handleFormChange = (
		field: keyof ArticleStateType,
		value: OptionType
	) => {
		setFormState((prev) => ({
			...prev,
			[field]: value,
		}));
	};

	return (
		<main
			className={clsx(styles.main)}
			style={
				{
					'--font-family': articleState.fontFamilyOption.value,
					'--font-size': articleState.fontSizeOption.value,
					'--font-color': articleState.fontColor.value,
					'--container-width': articleState.contentWidth.value,
					'--bg-color': articleState.backgroundColor.value,
				} as CSSProperties
			}>
			<ArticleParamsForm
				isOpened={isOpened}
				onToggle={() => setIsOpened(!isOpened)}
				formState={formState}
				handlers={{
					onChange: handleFormChange,
					onApply: handleApply,
					onReset: handleReset,
				}}
			/>
			<Article />
		</main>
	);
};
