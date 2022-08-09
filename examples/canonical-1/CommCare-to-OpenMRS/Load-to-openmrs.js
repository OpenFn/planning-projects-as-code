createEncounter({
  encounterDatetime: dataValue('visit_date'),
  patient: dataValue('uuid'),
  encounterType: dataValue('visit_type'),
  location: dataValue('location.uuid'),
  encounterProviders: [
    {
      provider: dataValue('provider_name'),
      encounterRole: '240b26f9-dd88-4172-823d-4a8bfeb7841f',
    },
  ],
});
