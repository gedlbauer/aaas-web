// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

const clients = [ // to allow easy switching between different clients
  'd1447938-c1bd-453d-a2a8-bb1b895fbe65',
  '6f37e107-9670-4d16-8dac-eb999acb2f92',
  'd886ac38-a457-4c1a-8003-1b4adcbdaf54',
  '17df8d92-6479-4753-b9f7-e0c554abe6b3',
  'd71bd45e-2e59-4049-bef2-dc6cbc79fe34'
]

export const environment = {
  production: false,
  apiKey: clients[2],
  apiUrl: 'https://localhost:5001'
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
