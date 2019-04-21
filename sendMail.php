<?php
	header('Content-Type: application/json');
	$json = array();
	$json['success'] = false;
	$json['error'] = array();
	$validate = true;
	$subject = '';


	if(isset($_GET) && $_GET['feedback'] == 1) {

		if(!empty($_POST)) {

			if(empty($_POST['name'])) {
				$json['error'][] = 'name';
			}

            if(empty($_POST['phone'])) {
                $json['error'][] = 'phone';
            }

            $subject = 'Обратный звонок';

            $json['form'] = $type = 'feedback';

            $message = '
                      <html lang="ru">
                           <head>
                                <title>'.$subject.'</title>
                            </head>
                            <body>
                                <p>Имя: '.$_POST['name'].'</p>
                                <p>Телефон: '.$_POST['phone'].'</p>                        
                            </body>
                        </html>';
		}
	}  elseif (isset($_GET) && $_GET['review'] == 1) {
        if(!empty($_POST)) {

            if(empty($_POST['name'])) {
                $json['error'][] = 'name';
            }

            if(empty($_POST['email'])) {
                $json['error'][] = 'email';
            }

            if(empty($_POST['mess'])) {
                $json['error'][] = 'mess';
            }

            $subject = 'Отзыв';

            $json['form'] = $type = 'review';

            $message = '
                      <html lang="ru">
                           <head>
                                <title>'.$subject.'</title>
                            </head>
                            <body>
                                <p>Имя: '.$_POST['name'].'</p>
                                <p>Почта: '.$_POST['email'].'</p>
                                <p>Сообщение: '.$_POST['mess'].'</p>
                            </body>
                        </html>';
        }
    } else {
		$validate = false;
	}

	if($validate) {
		if(empty($json['error'])) {
			$to = 'clean@gmail.com';
			$headers  = "Content-type: text/html; charset=UTF-8 \r\n";
			$headers .= "From: Clean <noreply@clean.ru>\r\n";
			mail($to, $subject, $message, $headers);
			$json['success'] = true;
		}
		echo json_encode($json);
	}

