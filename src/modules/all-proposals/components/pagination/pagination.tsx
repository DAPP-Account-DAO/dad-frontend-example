import * as React from 'react'
import {
  PaginationContainer,
  Wrapper,
  PageSwitchBtn,
  GoToPage,
  Switch,
  PageIndicator,
  ThreeDots,
  InputField,
  FormContainer,
  GoToButton,
  Container,
} from './style'
import { Formik, Form } from 'formik'
import * as Yup from 'yup'
import { NextButton, BackButton } from '../../../../images'

interface Props {
  totalPages: number
  switchPage: (page: number) => void
  currentPage: number
}

const Pagination = (props: Props) => {
  const { totalPages, switchPage, currentPage } = props
  const schema = Yup.object().shape({
    page: Yup.number()
      .required('Enter page number')
      .min(1)
      .max(totalPages, `Not grater than ${totalPages}`)
      .integer('Please provide integer'),
  })

  const initialValue = {
    page: 1,
  }

  const moveForward = () => {
    if (currentPage < totalPages) {
      switchPage(currentPage + 1)
    }
  }

  const moveBack = () => {
    if (currentPage === 1) {
      switchPage(currentPage)
    } else {
      switchPage(currentPage - 1)
    }
  }

  const handleSubmit = (values: any) => {
    let { page } = values
    page = parseInt(page)
    switchPage(page)
  }

  const renderPageNumbers = () => {
    if (totalPages < 5) {
      let pages = []
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i)
      }
      return (
        <Switch>
          {pages.map((v: number, k: number) => (
            <PageIndicator active={currentPage === v} key={k}>
              {v}
            </PageIndicator>
          ))}
        </Switch>
      )
    }

    return (
      <Switch>
        <PageIndicator active={currentPage === 1}>{1}</PageIndicator>
        <PageIndicator active={currentPage === 2}>{2}</PageIndicator>
        {currentPage > 2 && currentPage <= totalPages - 2 && (
          <PageIndicator active={true}>{currentPage}</PageIndicator>
        )}
        <ThreeDots>...</ThreeDots>
        <PageIndicator active={currentPage === totalPages - 1}>{totalPages - 1}</PageIndicator>
        <PageIndicator active={currentPage === totalPages}>{totalPages}</PageIndicator>
      </Switch>
    )
  }

  return (
    <PaginationContainer>
      <Wrapper>
        <Container>
          <PageSwitchBtn onClick={() => moveBack()} inactive={currentPage === 1}>
            <img src={BackButton} alt="back" />
          </PageSwitchBtn>
          {renderPageNumbers()}
          <PageSwitchBtn onClick={() => moveForward()} inactive={currentPage === totalPages}>
            <img src={NextButton} alt="next" />
          </PageSwitchBtn>
        </Container>

        <Container>
          <GoToPage>Go to page</GoToPage>
          <Formik initialValues={initialValue} validationSchema={schema} onSubmit={handleSubmit}>
            {() => (
              <Form>
                <FormContainer>
                  <InputField name="page" />
                  <GoToButton type="submit">
                    Go
                    <img src={NextButton} alt="next" />
                  </GoToButton>
                </FormContainer>
              </Form>
            )}
          </Formik>
        </Container>
      </Wrapper>
    </PaginationContainer>
  )
}

export default Pagination
