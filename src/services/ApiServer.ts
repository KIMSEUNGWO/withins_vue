export class ApiServer {

  static server : String = 'https://localhost:8080';

  static fetchPost(url : String, json : Object) {
    return fetch(`${ApiServer.server}${url}` , {
      method : 'post',
      credentials: 'include',
      headers : {'Content-Type' : 'application/json'},
      body : JSON.stringify(json)
    })
      .then(res => res.json())
  }

  static fetchGet(url : String) {
    return fetch(`${ApiServer.server}${url}`, {
      credentials: 'include'
    })
      .then(res => res.json());
  }

  static mockRecruit(data : Object) {
    return {
      'result': 'OK',
      'data': {
        'totalElements': 30,
        'totalPages': 50,
        'pageNumber': 0,
        'word': data.word,
        'region': data.region,
        'content': [
          {
            'recruitId': 1,
            'title': '2025년 사회교육프로그램 강사모집 [웰빙댄스]',
            'organization': {
              'organizationId': 1,
              'region': '인천 남동구'
            },
            'createAt': '2025-01-01T00:00:00',
            'deadline': '2025-06-01T12:00:00',
          },
          {
            'recruitId': 2,
            'title': '2025년 사회교육프로그램 강사모집 [웰빙댄스]',
            'organization': {
              'organizationId': 1,
              'region': '인천 남동구'
            },
            'createAt': '2025-01-01T00:00:00',
            'deadline': '2025-06-01T12:00:00',
          },
          {
            'recruitId': 3,
            'title': '2025년 사회교육프로그램 강사모집 [웰빙댄스]',
            'organization': {
              'organizationId': 1,
              'region': '인천 남동구'
            },
            'createAt': '2025-01-01T00:00:00',
            'deadline': '2025-06-01T12:00:00',
          },
        ]
      }
    };
  }
}