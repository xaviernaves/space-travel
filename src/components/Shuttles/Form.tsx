import * as Yup from "yup";
import { Formik } from "formik";
import React, { ReactElement, useState } from "react";
import styled from "@emotion/styled";
import {
	Check,
	CheckInput,
	CheckInputContainer,
	Error,
	InputContainer,
	InputLabel,
	Price,
	SelectContainer,
	SelectInput,
	SelectOption,
	Separator,
	TextInput,
} from "../../styles/GenericStyles";
import { Extra, Shuttle } from "../../utils/types";
import { usePurchaseContext } from "../../context/PurchaseContext";
import { useRouter } from "next/dist/client/router";

const FormContainer = styled.div`
	display: flex;
	flex-direction: column;
`;

const FormDetails = styled.div`
	display: flex;
	flex-direction: column;

	@media (min-width: 1024px) {
		flex-direction: row;
		justify-content: space-between;
	}
`;

const FormInputs = styled.div`
	display: flex;
	flex-direction: column;
	width: 100%;
	margin-bottom: 24px;

	@media (min-width: 1024px) {
		width: 60%;
		margin-bottom: 0;
	}
`;

const FormExtras = styled.div`
	width: 100%;

	@media (min-width: 1024px) {
		width: 40%;
	}
`;

const ExtrasHeading = styled.span`
	display: block;
	margin-bottom: 24px;
`;

const ExtrasContainer = styled.div`
	display: flex;
	flex-direction: column;
`;

const ExtraInner = styled.div`
	display: flex;
	max-width: 500px;
	justify-content: space-between;
	align-items: center;

	&:not(:last-child) {
		margin-bottom: 18px;
	}
`;

const ExtraCheckbox = styled.div`
	display: flex;
	align-items: center;
`;

const ExtraName = styled.label`
	margin-left: 20px;
	cursor: pointer;
`;

type PriceNumber = {
	price: number;
};
const ExtraPrice = styled.span<PriceNumber>`
	${(props) => (props.price === 0 ? "color: #9BD0BE;" : "")}
`;

const FormFooter = styled.div`
	display: flex;
	flex-direction: column;

	@media (min-width: 1024px) {
		flex-direction: row;
		justify-content: space-between;
		align-items: center;
	}
`;

const SubmitButton = styled.button`
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

export type FormValues = {
	name: string;
	surname: string;
	seat: string;
	extras: string[];
};

const initialValues: FormValues = {
	name: "",
	surname: "",
	seat: "",
	extras: [],
};

const shoppingSchema = Yup.object().shape({
	name: Yup.string().min(2, "Name too short").required("Name is required"),
	surname: Yup.string()
		.min(2, "Surname too short")
		.required("Surname is required"),
	seat: Yup.string().required("A seat is required"),
});

interface Props {
	shuttle: Shuttle;
	extras: Extra[];
}

const Form = ({ shuttle, extras }: Props): ReactElement => {
	const router = useRouter();
	const [price, setPrice] = useState<number>(Number(shuttle.basePrice));
	const { data, updatePurchaseData } = usePurchaseContext();

	const calcPrice = (
		event: React.ChangeEvent<HTMLInputElement>,
		extra_price: string
	) => {
		if (event.target.checked) setPrice(price + Number(extra_price));
		else setPrice(price - Number(extra_price));
	};

	const submitForm = (values: FormValues) => {
		updatePurchaseData(values, shuttle, price);
		router.push('/purchase');
	};
	return (
		<Formik
			onSubmit={submitForm}
			validateOnChange={false}
			validateOnBlur={false}
			initialValues={initialValues}
			validationSchema={shoppingSchema}
		>
			{(formik) => {
				const { values, handleChange, handleSubmit, errors, handleBlur } = 
					formik;
				return (
					<form noValidate onSubmit={handleSubmit}>
						<FormContainer>
							<FormDetails>
								<FormInputs>
									<InputContainer>
										<InputLabel htmlFor="name">Name</InputLabel>
										<TextInput
											name="name"
											id="name"
											placeholder="Write your name"
											value={values.name}
											onChange={handleChange}
										/>
										{errors.name && <Error>{errors.name}</Error>}
									</InputContainer>
									<InputContainer style={{ marginTop: 16 }}>
										<InputLabel htmlFor="surname">Surname</InputLabel>
										<TextInput
											name="surname"
											id="surname"
											placeholder="Write your surname"
											value={values.surname}
											onChange={handleChange}
										/>
										{errors.surname && <Error>{errors.surname}</Error>}
									</InputContainer>

									<InputContainer style={{ marginTop: 32 }}>
										<InputLabel>Select seat</InputLabel>
										<SelectContainer>
											<SelectInput
												name="seat"
												value={values.seat}
												onChange={handleChange}
												required
											>
												<SelectOption value="">Select a seat</SelectOption>
												{shuttle.availableSeats.map((seat, key) => (
													<SelectOption key={key} value={seat}>
														{seat}
													</SelectOption>
												))}
											</SelectInput>
										</SelectContainer>

										{errors.seat && <Error>{errors.seat}</Error>}
									</InputContainer>
								</FormInputs>
								<FormExtras>
									<ExtrasHeading>Choose some extras</ExtrasHeading>
									<ExtrasContainer>
										{extras.map((extra, key) => (
											<ExtraInner key={key}>
												<ExtraCheckbox>
													<CheckInputContainer type="checkbox">
														<CheckInput
															type="checkbox"
															name="extras"
															id={`extra_${extra.name}`}
															value={extra.name}
															onChange={(e) => {
																handleChange(e);
																calcPrice(e, extra.price);
															}}
														></CheckInput>
														<Check></Check>
													</CheckInputContainer>
													<ExtraName htmlFor={`extra_${extra.name}`}>
														{extra.name}
													</ExtraName>
												</ExtraCheckbox>
												<ExtraPrice price={Number(extra.price)}>
													{Number(extra.price) > 0 ? `${extra.price}₿` : "Free"}
												</ExtraPrice>
											</ExtraInner>
										))}
									</ExtrasContainer>
								</FormExtras>
							</FormDetails>
							<Separator />
							<FormFooter>
								<Price>Total: {price}₿</Price>
								<SubmitButton type="submit">Buy now</SubmitButton>
							</FormFooter>
						</FormContainer>
					</form>
				);
			}}
		</Formik>
	);
};

export default Form;
