//Установить npm пакет formik https://www.npmjs.com/package/formik
//Установить npm пакет prop-types https://www.npmjs.com/package/prop-types


export default () => {
  return(
    <Formik>
      {(props) => {
        return(
          <Form>
            <CustomSelect
                name="currentStat"
                options={[
                  {
                      id: "value",
                      display: "Текст"
                  }
                ]}
                setFieldValue={props.setFieldValue}
                placeholder="Селект"
                value={[]}/>
          </Form>
        )
      }}
    </Formik>
  )
}
