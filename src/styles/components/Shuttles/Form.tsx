import styled from "@emotion/styled";

export const FormContainer = styled.div`
	display: flex;
	flex-direction: column;
`;

export const FormDetails = styled.div`
	display: flex;
	flex-direction: column;

	@media (min-width: 1024px) {
		flex-direction: row;
		justify-content: space-between;
	}
`;

export const FormInputs = styled.div`
	display: flex;
	flex-direction: column;
	width: 100%;
	margin-bottom: 24px;

	@media (min-width: 1024px) {
		width: 60%;
		margin-bottom: 0;
	}
`;

export const FormExtras = styled.div`
	width: 100%;

	@media (min-width: 1024px) {
		width: 40%;
	}
`;

export const ExtrasHeading = styled.span`
	display: block;
	margin-bottom: 24px;
`;

export const ExtrasContainer = styled.div`
	display: flex;
	flex-direction: column;
`;

export const ExtraInner = styled.div`
	display: flex;
	max-width: 500px;
	justify-content: space-between;
	align-items: center;

	&:not(:last-child) {
		margin-bottom: 18px;
	}
`;

export const ExtraCheckbox = styled.div`
	display: flex;
	align-items: center;
`;

export const ExtraName = styled.label`
	margin-left: 20px;
	cursor: pointer;
`;

type PriceNumber = {
	price: number;
};
export const ExtraPrice = styled.span<PriceNumber>`
	${(props) => (props.price === 0 ? "color: #9BD0BE;" : "")}
`;

export const FormFooter = styled.div`
	display: flex;
	flex-direction: column;

	@media (min-width: 1024px) {
		flex-direction: row;
		justify-content: space-between;
		align-items: center;
	}
`;

export const SubmitButton = styled.button`
	color: #0e0e0e;
	padding: 8px 32px;
	border: none;
	outline: none;
	font-size: 1.5rem;
	font-weight: bold;
	background-color: #ffc400;
	border-radius: 2px;
	cursor: pointer;

	@media (max-width: 1024px) {
		margin-top: 16px;
	}
`;
